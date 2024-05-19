const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    let androidManifest = config.modResults.manifest;

    androidManifest.application[0].activity[0]["intent-filter"].push({
      action: [
        {
          $: {
            "android:name":
              "android.intent.action.VIEW_PERMISSION_USAGEcategory",
            "android:name": "android.intent.category.HEALTH_PERMISSIONS ",
          },
        },
      ],
    });

    return config;
  });
};
