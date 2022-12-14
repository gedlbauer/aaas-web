import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Observable, Subscription, switchMap, tap } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
import { Log } from 'src/app/types/log.type';
import { LogType } from 'src/app/types/logType.type';

@Component({
  selector: 'aaas-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions: Subscription[] = [];
  logs$: Observable<Log[]>;
  logTypes$: Observable<LogType[]>;
  displayedColumns: string[] = ['name', 'typeId', 'timestamp', 'message'];
  dataSource = new MatTableDataSource<Log>([]);
  keyup = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  isLoading: boolean = false;

  constructor(private logsService: LogsService) {
    this.logTypes$ = this.logsService.getLogTypes();
    this.logs$ = this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(x => this.logsService.getFiltered(x)),
      tap(() => this.isLoading = false)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator ?? null;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.logs$.subscribe(x => this.dataSource.data = x));
    this.keyup.emit();
  }

}
