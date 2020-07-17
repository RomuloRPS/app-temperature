import { Component } from "@angular/core";
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebasex: FirebaseX
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // get FCM token
      this.firebasex.getToken().then((token) => {
        localStorage.setItem("device_token", token);
      });

      // ionic push notification example
      this.firebasex.onMessageReceived().subscribe((data) => {
        alert('recebeu notificação');
      });

      // refresh the FCM token
      this.firebasex.onTokenRefresh().subscribe((token) => {
      });

      this.firebasex.subscribe(('global')).then((resp) => {
        console.log(resp);
      }).catch((error) => {
        console.log(error);
      })
    });
  }
}
