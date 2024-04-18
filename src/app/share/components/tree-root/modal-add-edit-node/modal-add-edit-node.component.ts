import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { components } from '@share/models/tab-bar.model';
import { Nodes } from '@share/models/node';
@Component({
  selector: 'app-modal-add-edit-node',
  templateUrl: './modal-add-edit-node.component.html',
  styleUrls: ['./modal-add-edit-node.component.scss'],
})
export class ModalAddEditNodeComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  preview: any;
  logoRest: string = '';
  subscription = new Subscription();
  components = components;

  @Input() node: Nodes = new Nodes();
  constructor(
    public activeModal: NgbActiveModal,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}
  selectFiles(event: any): void {
    const file = event.target.files[0];
    this.node.image = file.name;
    this.preview = document.querySelector('.logo-rest');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  insertNode() {
    this.activeModal.close(this.node);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
