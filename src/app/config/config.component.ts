import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSnackBar, MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";
import {plainToClass, Type} from "class-transformer";
import {ConfigService} from "./config.service";

export function nodeType() {
  const func = () => ItemNode;
  return func;
}

export class ItemNode {
  @Type(nodeType())
  children: ItemNode[];
  displayName: string;
}

export class ItemFlatNode {
  displayName: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  loading = true;

  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);

  classed: ItemNode[];

  constructor(private configService: ConfigService, private snackBar: MatSnackBar) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.configService.downloadSettings().subscribe(k => {
      this.classed = plainToClass(ItemNode, k);
      this.dataSource.data = this.classed;
      this.loading = false;
      for (let c of this.classed) {
        for (let ch of c.children) {
          if ((ch as any).enabled)
            this.todoLeafItemSelectionToggle(this.nestedNodeMap.get(ch));
        }
      }
    });



  }

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node.children;

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.displayName === '';

  transformer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.displayName === node.displayName
      ? existingNode
      : new ItemFlatNode();
    flatNode.displayName = node.displayName;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: ItemFlatNode): void {
    let parent: ItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: ItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: ItemFlatNode): ItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  save() {
    for (let c of this.classed) {
      for (let ch of c.children) {
        (ch as any).enabled = false;
        (ch as any).enabled =  this.checklistSelection.isSelected(this.nestedNodeMap.get(ch))
      }
    }
    this.configService.updateSettings(this.classed).subscribe(r => {
      this.snackBar.open("Installation completed", "Dismiss", {duration: 3000});
    });
  }

  ngOnInit() {
  }

}
