import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Carrier} from "../../../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-carrier',
  templateUrl: './new-carrier.component.html',
  styleUrls: ['../../../../../carriers/components/carriers-list/carriers-list.component.scss']
})
export class NewCarrierComponent implements OnInit{

  form: FormGroup
  isExists: Carrier | undefined

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      mc: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      usdot: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
    })
  }


  submit() {
    if(this.form.valid) {

      this.form.patchValue({
        name: this.form.get('name')?.value.trim(),
        // mc: +this.form.get('mc')?.value,
        // usdot: +this.form.get('usdot')?.value
      })

      this.http.post<Carrier>(`http://localhost:3000/api/carriers/`, this.form.value).subscribe( result => {
        if(result.isExists === true) {
          this.isExists = result
        } else {
          this.isExists = undefined
          // this.carriers.push(result)
          this.form.reset()
        }
        console.log('result', result)
      })
    }
  }
}
