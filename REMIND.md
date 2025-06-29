├───public
│   │   manifest.json
│   │   service-worker.js
│   │
│   └───assets
│       ├───icons
│       │       icon-192.png
│       │       icon-512.png
│       │
│       └───libs
│           └───leaflet
│               │   leaflet.css
│               │   leaflet.js
│               │
│               └───images
│                       marker-icon-2x.png
│                       marker-icon.png
│                       marker-shadow.png
│
└───src
    │   index.html
    │
    ├───assets
    │       styles.css
    │
    ├───components
    │       loadingComponent.js
    │
    ├───pages
    │       addStoryPage.js
    │       homePage.js
    │       loginPage.js
    │       registerPage.js
    │       renderAddStoryPage.js
    │
    └───scripts
        │   idb.js
        │   main.js
        │   push-notification.js
        │   router.js
        │   view-transition.js
        │
        ├───api
        │       auth-api.js
        │       story-api.js
        │
        ├───model
        │       auth-model.js
        │       storyModel.js
        │
        ├───presenter
        │       add-presenter.js
        │       auth-presenter.js
        │       home-presenter.js
        │       idb-presenter.js
        │       login-presenter.js
        │       register-presenter.js
        │       showHome.js
        │       storyPresenter.js
        │
        └───view
                add-view.js
                home-view.js
                login-view.js
                map-view.js
                navigation-view.js
                register-view.js
                saved-stories-view.js
                storyView.js