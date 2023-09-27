import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProducersService} from "../../../../../shared/services/fetch/producers.service";
import {Producer} from "../../../../../shared/interfaces";

@Component({
  selector: 'app-new-producer',
  templateUrl: './new-producer.component.html',
  styleUrls: ['../producers.component.scss']
})
export class NewProducerComponent implements OnInit{

  @Output() newProducerEmmiter: EventEmitter<Producer> = new EventEmitter<Producer>();
  newProducerForm: FormGroup

  constructor(private producersService: ProducersService) {
  }
  ngOnInit() {
    this.newProducerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      coiRequests: new FormControl(null, [Validators.required, Validators.email]),
      agents: new FormArray([])
    });

    // this.newProducerForm.valueChanges.subscribe(console.log)
  }

  get agents():FormArray {
    return this.newProducerForm.get('agents') as FormArray;
  }

  anotherAgent() {
      const agent = new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      });
      this.agents.push(agent)
  }

  removeAgent(agentIndex:number) {
    this.agents.removeAt(agentIndex)
  }

  submitNewProducer() {
    this.producersService.newProducer(this.newProducerForm.value).subscribe(result => {
      console.log(result)
      this.newProducerEmmiter.emit(result)
      this.newProducerForm.reset()
    })
  }
}
