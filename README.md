# TransmissionVue (transmission-vue)

Simple vuejs web client for the transmissionbt

## Install the dependencies
```bash
yarn
```

### Currently supported only BEX mode (Browser Extension)

Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m bex
```

### Install extension in development mode
 - Open Browser, go to preferences -> extensions
 - `Load Unpacked` and choose PATH_TO_REPO/src-bex

### Use vue-devtools

Make sure it's running on port 8098, otherwise update entry in
(manifest.json)[./src-bex/manifest.json]

```bash
yarn run vue-devtools
```

### Desktop app supported via electron

```bash
quasar dev -m electron
```
