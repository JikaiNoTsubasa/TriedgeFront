import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'markdown-editor',
  imports: [],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true
    }
  ]
})
export class MarkdownEditorComponent {

  @Input() content: string = '';
  @Input() placeholder: string = 'Content';
  @Input() contentRows: number = 4;

  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  onUpdateContent(event: Event) {
    this.content = (event.target as HTMLTextAreaElement).value;
    this.onChange(this.content);
  }

  writeValue(value: string | null): void {
    this.content = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
