# Citizen-skins-Wikimedia

A script that allows you to use Citizen Skin in Wikipedia and other Wikimedia projects.

This project is not a fork of Citizen, but rather a Citizen interface built using scripts on the Vector 2022 DOM.

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or Violentmonkey)

2. [Click here to install](https://raw.githubusercontent.com/Chatsven/Citizen-skins-Wikimedia-Projects/main/citizen-wikimedia-projects.user.js) — Tampermonkey will automatically open the installation page.

3. Accessing any `*.wikipedia.org` page will activate the script; the script only runs on the Vector 2022 skin, skipping other skins.

The `@updateURL` is configured in the metadata, and the script will automatically check for upgrades when the repository updates. Remember to increment the `@version` header when releasing a new version; otherwise, the update will not be triggered.

It can also be deployed as a MediaWiki Gadget: Paste the CSS and subsequent JS from the `<style>` template literal into `MediaWiki:CitizenVector.css/.js`, and register it in `Gadgets-definition`.


## License
- Unless otherwise stated, this project is released under **CC BY-NC-SA 4.0**, and additional terms may apply.
