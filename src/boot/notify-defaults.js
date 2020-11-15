import { Notify } from 'quasar'

Notify.setDefaults({
  color: 'positive',
  position: 'top-right',
  timeout: 3000,
  progress: true,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
