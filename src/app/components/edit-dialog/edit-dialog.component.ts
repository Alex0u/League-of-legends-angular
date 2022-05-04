import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { displayedColumns } from 'src/app/utils/constants';
import { IChampion } from 'src/app/utils/interface';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  displayedColumns: string[] = displayedColumns;
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

  /**
   * @description Allows to get the current formArray for tags.
   * 
   * @returns {FormArray} The tags's formArray.
   */
  get tagsControls(): FormArray {
    return this.championForm.controls['tags'] as FormArray;
  }

  /**
   * @description This method is used to add a tag to the form.
   * 
   * @param {MatChipInputEvent} event The mat-input chip-list event.
   */
  addTag(event: MatChipInputEvent): void {
    const input = event.chipInput?.inputElement;
    const value = event.value;

    if ((value || "").trim()) this.tagsControls.push(this.fb.control(value));
    if (input) input.value = "";
  }

  /**
   * @description This method is used to remove a tag to the form.
   * 
   * @param {MatChipInputEvent} event The mat-input chip-list event.
   */
  removeTag(tag: string): void {
    const index = this.tagsControls.value.indexOf(tag);
    if (index >= 0) this.tagsControls.removeAt(index);
  }

  /**
   * @description This function close the dialog with form value as
   * a result sent to the opener.
   */
  onSubmit() {
    const champion: IChampion = this.championForm.value;
    champion.id = this.data.id;
    champion.key = this.data.key;
    if(champion.tags?.length === 0) champion.tags = undefined;
    this.dialogRef.close(champion);
  }

  /**
   * @description This function close the dialog without result to
   * the opener.
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
