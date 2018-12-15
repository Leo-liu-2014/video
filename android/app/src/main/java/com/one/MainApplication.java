package com.one;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.one.invokenative.DplusReactPackage;
import com.one.invokenative.RNUMConfigure;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new OrientationPackage(),
            new BlurViewPackage(),
            new ReactVideoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // Config.shareType = "react native";
    UMConfigure.setLogEnabled(true);
        //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
        RNUMConfigure.init(this, "5beaff7ef1f556a82b0007fc", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,"669c30a9584623e70e8cd01b0381dcb4");
  }
}
