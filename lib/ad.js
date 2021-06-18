import React from "react";
import Constants from "expo-constants";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";

// test
const testAdmobId = {
  android: {
    banner: "ca-app-pub-3940256099942544/6300978111",
    interstitial: "ca-app-pub-3940256099942544/1033173712",
    rewardvideo: "ca-app-pub-3940256099942544/5224354917",
    open: "ca-app-pub-3940256099942544/3419835294",
  },
  ios: {
    banner: "ca-app-pub-3940256099942544/6300978111",
    interstitial: "ca-app-pub-3940256099942544/1033173712",
    rewardvideo: "ca-app-pub-3940256099942544/5224354917",
    open: "ca-app-pub-3940256099942544/3419835294",
  },
};

// release
const releaseAdmobId = {
  android: {
    banner: "ca-app-pub-1963334904140891/5952121831",
    interstitial: "ca-app-pub-1963334904140891/8000534829",
    rewardvideo: "ca-app-pub-1963334904140891/4061289819",
    // open: "ca-app-pub-1963334904140891/1438237735",
  },
  ios: {
    banner: "ca-app-pub-1963334904140891/5185911059",
    interstitial: "ca-app-pub-1963334904140891/5654730631",
    rewardvideo: "ca-app-pub-1963334904140891/1715485629",
    // open: "ca-app-pub-1963334904140891/9402403955",
  },
};

export const adUnitID =
  Constants.isDevice && !__DEV__ ? releaseAdmobId : testAdmobId;

export const Banner = ({ bannerSize = "fullBanner" }) => {
  return (
    <AdMobBanner
      bannerSize={bannerSize}
      adUnitID={adUnitID.android.banner} // Test ID, Replace with your-admob-unit-id
      servePersonalizedAds // true or false
    />
  );
};

export const Interstitial = async () => {
  await AdMobInterstitial.setAdUnitID(adUnitID.android.interstitial); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();

  return AdMobInterstitial;
};
