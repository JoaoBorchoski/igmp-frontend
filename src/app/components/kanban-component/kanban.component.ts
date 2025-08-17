import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"

@Component({
    selector: "app-kanban",
    templateUrl: "./kanban.component.html",
})
export class KanbanComponent implements OnInit {
    @Input() kanbanData: any
    @Output() cardDropped = new EventEmitter<any>()
    @Output() cardClicked = new EventEmitter<any>()

    constructor() {}

    ngOnInit(): void {}

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
        }

        this.cardDropped.emit({
            item: event.item.data,
            previousContainer: event.previousContainer.data,
            container: event.container.data,
        })
    }

    openBudget(item: any) {
        this.cardClicked.emit(item)
    }
}
