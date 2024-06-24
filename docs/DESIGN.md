# DM-SCREEN

dm-screen is an application to leverage the speed of virtual D&D tooling to assist with running in-person TTRPGS.

**This project is intended to keep my skills sharp and should not be considered a serious project by anyone until otherwise stated.**

## Product Level Problems to Solve

- Rules lookup is cumbersome in-person
- Player introductions and filling out player names is time consuming.
- Managing notes across sessions can result in a lot of paper work
- Losing track of conditions and countdowns is common
- DMs lose track of player health constantly, making encounter balancing hard.
- Initiative tracking can take up a lot of game time
- Most world building CMSs are a nightmare of dropdown menus that make no sense. 
- Handouts and artwork require printing out each page

## Product Goals

- dm-screen will be systems agnostic. MOTW, D&D, Pathfinder, and more should be all supportable. This means a loose coupling between UI behavior and system specific extensions.
- System level entities: spells, creatures, items, etc, should not be normalized. Leverage document storage, markdown, or some form of generic content saving for these items.
- dm-screen should support the following features from version 1
  - Create a campaign
  - Add players to a campaign
  - Add characters to a campaign
  - Associate characters with players
  - Add creatures to a campaign
  - Add items to a campaign
  - Add spells to a campaign
  - Create notes about that campaign
  - Create a session under that campaign
  - Create notes about the session
  - Inject system level item cards into session notes
  - Track combat initiative
  - Display a quick reference of system rules
  - Display player facing screen that reflects current state of the game and initiative order, creature statuses, countdowns, ect.
    - This should be very basic for V1.

## Technical Goals

- Draft of a comprehensive coding standards document.
- dumb-client/smart-server model: The server is authority on business logic and data handling. The client is to be considered a plugin of the business logic.
- The application is accessible to users with disabilities.
- A comprehensive design system to build pages from.
- Web Based: This application will be a web application first. Native application support will be a secondary concern.
- Web components will be built in a sandbox environment before being introduced to a page.
- localstorage caching is a requirement. A user should not lose their place in the event of an internet outage in a public setting.
- Bundle sizes must remain tight to preserve speed in spotty public settings. 
- Desktop/Tablet focus: This project will not support a mobile view with the first iteration.
- Testing is paramount and every feature will be associated with tests.
- Testing Model: Heavy unit test coverage with light integration testing at the page and API endpoint level.
- Linting and strict adherence to those rules is a must.

## Technical Stack and Application Structure

This project will use likely three projects to start in a mono-repo. They will be treated as independent projects until a split is required.

- Backend Models
- Backend DAL
- Backend Business Logic
- Frontend Design System
- Frontend DM View App
- Frontend Player View App

Communication between DM view and Player view will likely require a socket layer as well.

## Milestones

- UI Technical Infrastructure
- Set up UI Development Sandbox
- Build out First Design System Components
- Product Proof of Concept
- Backend Technical Infrastructure