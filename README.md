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

Replace default transmission web interface (not yet recommended)
----------------------------------------------------------------

Becuase of CORS policy, TransmissionVue cannot be used as an spa except if
served by transmission itself.

Currently only manual installation supported:

- Create override folder so as not to remove original transmission files
  ```console
  mkdir -p ~/.local/share/transmission/
  ```
- Build SPA
  ```console
  # from within the repo run
  yarn run quasar build -m spa
  ```
- Symlink folder
  ```console
  ln -s $PWD/build/spa ~/.local/share/transmission/web
  ```
This way when updates are available you can simply rebuild app and it will be
automatically available.

Alternatively copy files instead of symlink
- Instead of symlink step
  ```console
  cp -r $PWD/build/spa ~/.local/share/transmission/web
  ```

Note: you will need to restart transmission for the new web interface to be
available.


<!-- TODO: add proper wiki -->
