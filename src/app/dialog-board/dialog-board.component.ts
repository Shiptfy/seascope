import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-dialog-board',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './dialog-board.component.html',
  styleUrls: ['./dialog-board.component.scss']
})
export class DialogBoardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

}
