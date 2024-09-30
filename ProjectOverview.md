# Project Overview Document

## Introduction

This living document is meant to be an overview of this project, it's goals, it's milestones, and to establish guiding principles for design and development.

## Product Objective

### Vision

Easily manage, create, and run in-person TTRPG content, keeping ownership of data in the hands of the user.

### Goals

- **First MVP Test Drive:** 08/20/2024 - DD&D DMing session

### Personas

This product is intended for hobbyist GMs, primarily running in-person games, and who authors homebrew content.

**Rebecca:** An early 20s college student who runs weekly D&D one-shots for a local meetup with public sign-ups. She often comes up with game ideas the day of the event, often in class, but maintains a large backlog of homebrew content. 

**Mathew:** A mid-30s father who occasionally runs longer D&D games for a smaller group of friends. They are moderately technical and primarily depends on official content.

**Lucas:** A late 30s GM who often runs mid-length D&D content, and occasionally one-shots. Their adventures often reuse content and exist in a shared world.

### Approach

Build a web-based application to quickly import third-party TTRPG content and create homebrew content in the form of tagged markdown items. Provide quick searches for rules and tools for managing initiative.

### Out of Scope

- Native mobile applications
- Mobile web views
- Web Hosting - this will be a self hosted solution

## Design Considerations

**Open Source:** This will always remain a free and open source solution.

**Self Hosted:** The user should own any and all data they produce or import into their instance of this application. All network traffic should be local.

**Ease of Use:** Many virtual tabletop tools depend on large collections of form fields and custom scripting for users to get the most out of their tooling. This is time consuming and drives many to continue using generic note taking tools. Managing game content should rely as much on plain text as possible.

## Features

- Create and manage written adventures with an adventure editor
- Create and manage homebrew items, spells, and creatures
- Import third party content into the application
- Manage initiative order tied to a session of an adventure
- Display initiative status for players playing in an adventure
- Track creature status and conditions in initiative
- Search for rules definitions while conducting a session
