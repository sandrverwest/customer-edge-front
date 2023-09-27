import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Agents, Producer} from "../../../../../shared/interfaces";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProducersService} from "../../../../../shared/services/fetch/producers.service";
import {delay} from "rxjs";
import {SaverService} from "../../../../../shared/services/saver.service";

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['../producers.component.scss']
})
export class ProducerComponent implements OnInit{
  @Input() producer: Producer
  @Input() arrayIndex: number

  @Output() deleteProducerEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private producersService: ProducersService, private saverService: SaverService) {
  }
  producerForm: FormGroup

  ngOnInit() {
    this.producerForm = new FormGroup({
      name: new FormControl(this.producer.name, Validators.required),
      coiRequests: new FormControl(this.producer.coiRequests, [Validators.required, Validators.email]),
      agents: new FormArray([])
    });
    this.loadAgents()
  }

  anotherAgent() {
    const agent = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
    this.agents.push(agent)
  }

  private loadAgents() {
    this.producer.agents.forEach( element => {
      const agent = new FormGroup({
        name: new FormControl(element.name, Validators.required),
        email: new FormControl(element.email, [Validators.required, Validators.email])
      });
      this.agents.push(agent)
    })
  }
  get agents():FormArray {
    return this.producerForm.get('agents') as FormArray;
  }

  updateProducer(){
    this.saverService.show()
    this.producersService.updateProducer(this.producer._id, this.producerForm.value).subscribe(result=> {
      console.log(result)
      this.saverService.hide()
    })
  }

  removeAgent(agentIndex:number) {
    this.agents.removeAt(agentIndex)
  }

  deleteProducer(arrayIndex:number) {
    const isDelete = confirm(`Are you sure you want to delete ${this.producer.name} from the producers list?`);
    if(isDelete) {
      this.producersService.deleteProducer(this.producer._id).subscribe(result => {
        console.log(result)
        this.deleteProducerEmitter.emit(arrayIndex)
      })
    }
  }
}
