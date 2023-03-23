import { NgModule } from '@angular/core';
import { InlineFormComponent } from './inline-form/inline-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@NgModule({
	declarations: [InlineFormComponent],
	imports: [FormsModule,CommonModule],
	exports: [InlineFormComponent]
})
export class ComponentsModule {}
