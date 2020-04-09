import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


import { HomeService } from '@home-feature-module/services/home.service';


@Component({
  selector: 'app-home-aside-left',
  templateUrl: './aside-left.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public selectedMenu: string;
  public menus: {
    id: string;
    name: string;
    url: string;
    icon: string;
  }[];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly homeService: HomeService,
    private readonly router: Router,
    public readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menus = this.homeService.getMenus();

    this.subscriptions.push(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
