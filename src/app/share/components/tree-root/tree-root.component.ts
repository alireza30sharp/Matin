import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ITreeOptions,
  ITreeState,
  TreeModel,
  TreeNode,
} from '@circlon/angular-tree-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 } from 'uuid';
import { ModalAddEditNodeComponent } from './modal-add-edit-node/modal-add-edit-node.component';
import { ManageTabBarService } from '@share/services/manage-tab-bar.service';
import { Nodes } from '@share/models/node';

@Component({
  selector: 'app-tree-root',
  templateUrl: './tree-root.component.html',
  styleUrls: ['./tree-root.component.scss'],
})
export class TreeRootComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    public manageTabBarService: ManageTabBarService
  ) {}
  @ViewChild('tree') tree;
  ngOnInit(): void {}
  nodes: Array<Nodes> = [];
  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: true,
    rtl: true,

    // actionMapping: {
    //   mouse: {
    //     drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }) => {
    //       console.log(to);
    //       // use from to get the dragged node.
    //       // use to.parent and to.index to get the drop location
    //       // use TREE_ACTIONS.MOVE_NODE to invoke the original action
    //     },
    //   },
    // },
  };
  state: ITreeState = {
    expandedNodeIds: {
      1: true,
      2: true,
    },
    hiddenNodeIds: {},
    activeNodeIds: {},
  };

  // onMoveNode($event) {
  //   console.log(
  //     'Moved',
  //     $event.node.name,
  //     'to',
  //     $event.to.parent.name,
  //     'at index',
  //     $event.to.index
  //   );
  // }

  ngAfterViewInit() {
    // const someNode = this.tree.treeModel.getNodeById('someId');
    // someNode.expand();
    // const firstRoot = this.tree.treeModel.roots[0];
    // firstRoot.setActiveAndVisible();
  }
  addNode(tree: any, node: any) {
    let modalRef = this.modalService.open(ModalAddEditNodeComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.result.then((f: Nodes) => {
      f.id = v4();
      if (node.data.children) {
        node.data.children.push(f);
      } else {
        node.data.children = [];
        node.data.children.push(f);
      }

      tree.treeModel.update();
    });
    tree.treeModel.update();
  }
  addMenu(tree) {
    let modalRef = this.modalService.open(ModalAddEditNodeComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.result.then((f: Nodes) => {
      f.id = v4();
      this.nodes.push(f);
      tree.treeModel.update();
    });
  }
  menuClick(node: any) {
    if (node.data.component) {
      this.manageTabBarService.genarateComponent(node.data, false).subscribe();
    }
  }
  editNode(tree: any, node: any) {
    let modalRef = this.modalService.open(ModalAddEditNodeComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.componentInstance.node = Object.assign({}, node.data);
    modalRef.result.then((f: Nodes) => {
      node.data.name = f.name;
      node.data.icon = f.icon;
      node.data.component = f.component;
      node.data.image = f.image;
      tree.treeModel.update();
    });
  }
  removeNode(tree: any, node: any) {
    node.parent.data.children = node.parent.data.children.filter(
      (f) => f.name != node.data.name
    );
    tree.treeModel.update();
  }
}
