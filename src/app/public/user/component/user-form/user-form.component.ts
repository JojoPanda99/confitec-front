import {Component, EventEmitter, Input, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators,} from "@angular/forms";
import {UserFormControls} from "./user-form.type";
import {BaseComponent} from "../../../../shared/components/base-component.component";
import {User} from "../../../../core/models/user.model";
import {Observable} from "rxjs";

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styles: [`
        div.col-2 
            margin: auto 0px 0px
        
    `],
})
export class UserFormComponent extends BaseComponent {
    @Input() userValue!: Observable<User>;
    @Output() formEvent: EventEmitter<any> = new EventEmitter();
    protected userForm!: FormGroup<UserFormControls>;
    protected formControls!: UserFormControls;

    constructor(private fb: FormBuilder) {
        super();
    }

    override ngOnInit(): void {
        this.createFormGroup();
        this.formControls = this.userForm.controls;
    }

    override ngOnChanges(changes: SimpleChanges) {
        const currentValue = changes["userValue"].currentValue;
        currentValue.subscribe((user: any) => {
            this.userForm.patchValue({
                name: user.name,
                surname: user.surname,
                email: user.email,
                birthDate: user.birthDate,
                education: user.education,
            })
        });
    }

    protected submitForm() {
        if (this.userForm.valid) {
            this.formEvent.emit(this.userForm);
        }
    }

    private createFormGroup(): void {
        this.userForm = this.fb.group({
            name: new FormControl("", [Validators.required]),
            surname: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required]),
            birthDate: new FormControl("", [Validators.required]),
            education: new FormControl(NaN, [Validators.required, this.validateNaN]),
        });
    }

    private validateNaN = (control: FormControl): { [key: string]: any } | null => {
        return isNaN(control.value) ? {required: true} : null;
    }
}
