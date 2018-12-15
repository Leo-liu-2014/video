package com.one;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.MobclickAgent.EScenarioType;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "one";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //添加开屏图
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, EScenarioType.E_DUM_NORMAL);
        MobclickAgent.openActivityDurationTrack(false);

    }
}
