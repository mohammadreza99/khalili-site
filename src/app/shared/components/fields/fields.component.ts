import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@app/modules/products/business/product.service';

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit, OnChanges {
  @Input() categoryAttributes;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({});
  formItems = new FormGroup({});
  items = [];
  attributeTypes = {
    1: 'Text',
    2: 'Number',
    3: 'Date',
    4: 'Text Area',
    5: 'Select',
    6: 'Multi Select',
    7: 'CheckBox',
  };

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.generateForm();
  }

  ngOnInit() {
    this.generateForm();
    this.form.valueChanges.subscribe((res) => {
      let values = [];
      for (const key in res) {
        if (typeof res[key] == 'object' && res[key] != null) {
          if (res[key].length == undefined)
            values.push({
              attributeId: +key,
              value: res[key].year + '-' + res[key].month + '-' + res[key].day,
            });
          else {
            values.push({
              attributeId: +key,
              value:(res[key]).toString(),
            });
          }
        } else {
          values.push({
            attributeId: +key,
            value: ''+res[key]+'',
          });
        }
      }
      this.valueChange.emit(values);
    });
  }

  generateForm() {
    for (const categoryAttribute of this.categoryAttributes) {
      this.form.addControl(
        categoryAttribute.attributeId.toString(),
        new FormControl(categoryAttribute.value)
      );
      if (categoryAttribute.isRequired) {
        this.form.controls[
          categoryAttribute.attributeId.toString()
        ].setValidators(Validators.required);
      }
      if (
        categoryAttribute.attributeTypeId == 5 ||
        categoryAttribute.attributeTypeId == 6
      ) {
        this.productService
          .getAttributesValue(+categoryAttribute.attributeId)
          .subscribe((res) => {
            let items = [];
            res.forEach((item) => {
              items.push({
                label: item.value,
                value: item.id,
              });
            });
            this.formItems.addControl(
              categoryAttribute.attributeId.toString() + 'items',
              new FormControl(items)
            );
          });
      }
    }
  }
  getItems() {}
  onSubmit() {
    // if (this.form.valid) {
    //   this.dialogRef.close(this.form.value);
    // }
  }
}
