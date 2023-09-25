import { Component, OnInit } from '@angular/core';
import { AgendaSummary } from '@interfaces/agenda';
import { ApiResponse } from '@interfaces/api-response';
import { AlertService } from '@services/alert.service';
import { RequestService } from '@services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  public scrollTop: number = 0;
  public selectedDate;
  public activities: AgendaSummary[];

  constructor(
    private req: RequestService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    moment.locale('ID');
    this.selectedDate = moment('2018-08-06').format('YYYY-MM-DD');
    this.getActivities(this.selectedDate);
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  onDateChanged(ev) {
    this.selectedDate = moment(ev.target.value).format('YYYY-MM-DD');
    this.getActivities(this.selectedDate);
  }

  convertDate(date) {
    moment.locale('ID');
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  getActivities(date) {
    let data = {
      date: date,
    };
    this.req.apiPost('agenda/agenda-by-date', data).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.activities = res.data.schedules;
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText,
          text: err?.message,
        });
      },
    });
  }
}
