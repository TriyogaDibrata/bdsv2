import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiResponse } from '@interfaces/api-response';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  public scrollTop: number = 0;
  public user = this.auth.userData;
  base64Image: string;

  constructor(
    private auth: AuthService,
    private req: RequestService,
    public loader: LoadingService,
    private alerService: AlertService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {}

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  async getPhoto() {
    const permission = await Camera.checkPermissions();

    if (permission.camera == 'granted' && permission.photos == 'granted') {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.DataUrl,
        height: 300,
        width: 300,
      });

      this.base64Image = image.dataUrl;
    }
  }

  async updateProfile() {
    let data = {
      name: this.user.name,
      is_new_avatar: 0,
    };

    if (this.base64Image) {
      data['avatar'] = this.base64Image;
      data['is_new_avatar'] = 1;
    }

    await this.req.apiPost('user/update', data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.auth.storeUserData(res.data.user);
          this.alerService
            .showAlert({
              title: 'Success',
              text: 'Profile berhasil diperbaharui',
              status: 'success',
              autoClose: true,
              duration: 1000,
              showConfirmButton: true,
            })
            .then(() => {
              this.navCtrl.pop();
            });
        } else {
          this.alerService.showAlert({
            title: 'Update Failed',
            text: res.msg,
            status: 'error',
            showConfirmButton: true,
          });
        }
      },
      error: (err) => {
        this.alerService.showAlert({
          title: 'Something went wrong',
          text: err.message,
          autoClose: false,
          status: 'error',
          showConfirmButton: true,
        });
      },
    });
  }
}
