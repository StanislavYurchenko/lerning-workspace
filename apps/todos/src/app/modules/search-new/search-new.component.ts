import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'learning-workspace-search-new',
  templateUrl: './search-new.component.html',
  styleUrls: ['./search-new.component.scss'],
})
export class SearchNewComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;

  @Output() search: EventEmitter<string> = new EventEmitter();

  @Input() initQuery = '';

  @ViewChild('search', { static: true })
  searchFormRef: ElementRef<Document>;

  private subscription = new Subscription();
  private debounceTime = 500; //ms

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormControl();
    this.valueChangesSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private emitSearch(query: string): void {
    this.search.emit(query);
  }

  // TODO REFACTOR
  private valueChangesSubscriptions(): void {
    this.subscription.add(
      fromEvent(this.searchFormRef.nativeElement, 'input')
        .pipe(
          debounceTime(this.debounceTime),
          map((event) => {
            const inputRef = event?.target as HTMLInputElement;
            return inputRef?.value;
          })
        )
        .subscribe((value) => this.emitSearch(value))
    );
  }

  private createFormControl(): void {
    this.searchForm = this.fb.group({
      search: [this.initQuery, [Validators.minLength(3)]],
    });
  }
}
