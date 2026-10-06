module Main exposing (Model, Msg(..), init, main, update, view)

{-| Elm 0.19.3 driving a gclass-anims page.

The two halves never touch: this module emits `class` attributes and gclass-anims
reads them off the DOM. The only integration point is the JS entry, which calls
`Elm.Main.init` and then `initAnimations()` once.

Elm's virtual DOM means `rows` growing is a real DOM insertion, not an in-place
patch - which is exactly the case the animation engine's MutationObserver covers.

-}

import Browser
import Html exposing (Html, a, button, code, div, footer, h1, h2, h3, header, li, nav, p, pre, span, text, ul)
import Html exposing (Attribute)
import Html.Attributes exposing (class, href, id)
import Html.Events exposing (onClick)



---- MODEL


type alias Model =
    { rows : List Int
    }


init : Model
init =
    { rows = [] }


type Msg
    = AddRows
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddRows ->
            -- three at a time, so each click visibly inserts fresh nodes
            ( { model | rows = List.range (List.length model.rows + 1) (List.length model.rows + 3) }
            , Cmd.none
            )

        Reset ->
            ( init, Cmd.none )



---- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div [ class "gc-bar scroll-progress" ] []
        , header [ class "header expand-down ease-expo" ]
            [ div [ class "nav" ]
                [ a [ class "brand", href "https://elm-lang.org/" ] [ text "Elm" ]
                , nav [ class "tabs" ]
                    [ a [ href "#install" ] [ text "Install" ]
                    , a [ href "#quick-start" ] [ text "Quick start" ]
                    , a [ href "#anatomy" ] [ text "Class anatomy" ]
                    , a [ href "#notes" ] [ text "Notes" ]
                    ]
                ]
            ]
        , div [ class "splash" ]
            [ div [ class "messages" ]
                [ h1 [ class "scroll letter spawn-text-spawn-down" ]
                    [ text "gclass-anims "
                    , span [ class "splash-accent" ] [ text "for Elm" ]
                    ]
                , p [ class "scroll typewriter time-2" ]
                    [ text "Elm is pure functional: no hidden mutation, and the DOM is rebuilt from a value. gclass-anims animates whatever markup ends up in the document, so the two never need to know about each other." ]
                ]
            ]
        , Html.main_ [ class "content" ]
            [ installSection
            , quickStartSection model
            , anatomySection
            , notesSection
            , footer [ class "footer" ]
                [ p []
                    [ text "Not affiliated with or endorsed by the Elm team. Colours and type sampled from "
                    , a [ href "https://elm-lang.org/" ] [ text "https://elm-lang.org/" ]
                    , text ", including its IBM Plex Sans / Source Code Pro pairing and its #1293D8 blue. Running gclass-anims 1.0.0-beta.24 from npm with Elm 0.19.3."
                    ]
                ]
            ]
        ]


installSection : Html Msg
installSection =
    div [ id "install" ]
        [ h2 [ class "scroll letter spawn-text-spawn-down" ] [ text "Install" ]
        , p [ class "scroll typewriter" ]
            [ text "GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically - nothing is bundled or redistributed. Elm is a peer of this page, not a dependency of the library." ]
        , pre [ class "syntaxhighlighter scroll spawn-down" ]
            [ code [] [ text "npm install gclass-anims elm" ] ]
        ]


quickStartSection : Model -> Html Msg
quickStartSection model =
    div [ id "quick-start" ]
        [ h2 [ class "scroll letter spawn-text-spawn-down" ] [ text "Quick start" ]
        , p [ class "scroll typewriter" ]
            [ text "Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates - no per-element JS, no config files." ]
        , h3 [ class "scroll spawn-down" ] [ text "One call, after Elm.init" ]
        , pre [ class "syntaxhighlighter scroll spawn-down" ]
            [ code []
                [ text "// main.js\nimport { Elm } from './elm.js'\nimport { initAnimations } from 'gclass-anims'\n\nElm.Main.init({ node: document.getElementById('root') })\n\ninitAnimations()" ]
            ]
        , h3 [ class "scroll spawn-down" ] [ text "Live - rows from a growing list" ]
        , p [ class "scroll typewriter" ]
            [ text "Nothing re-initialises after this point. The button grows the list, Elm's virtual DOM inserts real nodes, and each one plays its entrance because the engine is watching for insertions." ]
        , div [ class "live-example" ]
            [ div [ class "controls" ]
                [ button [ class "button click-hover amount-2", onClick AddRows ] [ text "Add rows" ]
                , button [ class "button button--ghost click-hover amount-2", onClick Reset ] [ text "Reset" ]
                , span [ class "count" ] [ text (String.fromInt (List.length model.rows) ++ " rows") ]
                ]
            , div [ class "rows" ]
                (List.map viewRow model.rows)
            ]
        ]


viewRow : Int -> Html Msg
viewRow n =
    div [ class "row appear spawn-up time-1" ]
        [ text ("row " ++ String.fromInt n ++ " — inserted by Elm's virtual DOM") ]


anatomySection : Html Msg
anatomySection =
    div [ id "anatomy" ]
        [ h2 [ class "scroll letter spawn-text-spawn-down" ] [ text "Class anatomy" ]
        , p [ class "scroll typewriter-split letter" ]
            [ text "Class anatomy: behaviour (.spawn-up) + trigger (.scroll, .appear) + tunables (.time-1, .ease-back, .priority-2). Combine freely - order in class does not matter." ]
        , pre [ class "syntaxhighlighter scroll spawn-down" ]
            [ code []
                [ text "<!-- behaviour + trigger + tunables -->\n<div class=\"appear scroll spawn-up\">…</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">…</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>" ]
            ]
        , div [ class "cards" ]
            [ div [ class "card scroll spawn-down order priority-2" ]
                [ h3 [] [ text "Behaviour" ]
                , p [] [ text "spawn-up, float, marquee, magnet" ]
                ]
            , div [ class "card scroll spawn-down order priority-3" ]
                [ h3 [] [ text "Trigger" ]
                , p [] [ text "appear, scroll, preserve" ]
                ]
            , div [ class "card scroll spawn-down order priority-4" ]
                [ h3 [] [ text "Tunables" ]
                , p [] [ text "order, ease-expo, time-1, priority-2" ]
                ]
            ]
        ]


notesSection : Html Msg
notesSection =
    div [ id "notes" ]
        [ h2 [ class "scroll letter spawn-text-spawn-down" ] [ text "Notes" ]
        , ul []
            [ li [ class "scroll spawn-down order priority-2" ]
                [ text "Elm never sees the animation. There is no port, no command, no subscription. gclass-anims reads class attributes off the rendered DOM, which is the same surface any static HTML would give it." ]
            , li [ class "scroll spawn-down order priority-3" ]
                [ text "The virtual DOM is on your side. Elm inserts real elements when a list grows, so the MutationObserver catches them. Text updates patch a node in place, which gclass-anims has no interest in." ]
            , li [ class "scroll spawn-down order priority-4" ]
                [ text "Compiled output is bundler-agnostic. elm make --optimize emits one ES module, and Vite bundles that alongside gclass-anims into a single dist/ asset." ]
            ]
        ]



---- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



---- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( init, Cmd.none )
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

