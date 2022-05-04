import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChampion } from 'src/app/utils/interface';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  displayedColumns: string[] = ['name', 'key', 'title', 'tags'];
  championForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IChampion,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.championForm = this.fb.group({
      name: this.fb.control(data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      title: this.fb.control(data.title, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      tags: this.fb.array(data.tags ?? [], Validators.maxLength(2)),
    });
  }

  get tagsControls(): FormArray {
    return this.championForm.controls['tags'] as FormArray;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.chipInput?.inputElement;
    const value = event.value;

    if ((value || "").trim()) this.tagsControls.push(this.fb.control(value));
    if (input) input.value = "";
  }

  removeTag(tag: string): void {
    const index = this.tagsControls.value.indexOf(tag);
    if (index >= 0) this.tagsControls.removeAt(index);
  }

  onSubmit() {
    console.log(this.championForm.value);
  }

  /**
   * @description This function close the dialog.
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
