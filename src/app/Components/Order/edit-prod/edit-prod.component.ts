import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.scss']
})
export class EditProdComponent implements OnInit {
  id: number|null|undefined;

  header:string|undefined;
  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.id = +!this.route.snapshot.paramMap.get('pid')
    this.header = this.id===0? 'add' :'edit'
  }

}
