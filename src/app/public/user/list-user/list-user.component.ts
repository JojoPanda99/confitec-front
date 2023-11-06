import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {BaseComponent} from "src/app/shared/components/base-component.component";
import {ListUserFeatureService} from "../../../features/user/list-user-feature.service";
import {UserFeature} from "../../../core/models/user-responses.models";
import {Router, Routes} from "@angular/router";
import {UpdateUserComponent} from "../update-user/update-user.component";

@Component({
    selector: "app-list-user",
    template: `
        <h3 class="text-center">Lista de Usuarios</h3>
        <div class="container">
            <table class="table table-striped text-center">
                <thead>
                <th scope="col">Nome</th>
                <th scope="col">Escolaridade</th>
                </thead>
                <tbody>
                <tr
                        *ngFor="let user of users$ | async"
                        routerLinkActive="g-info-subtle"
                >
                    <td>{{ user.name }}</td>
                    <td>{{ user.education }}</td>
                    <td class="d-flex w-50 justify-content-between">
                        <button class="btn btn-dark" [routerLink]="['/view', user.id]">
                            Ver
                        </button>
                        <button class="btn btn-warning" [routerLink]="[{ outlets: { form: ['form', user.id] } }]">
                            Editar
                        </button>
                        <button class="btn btn-danger" (click)="deleteUser(user.id)">
                            Remover
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    `,
    styles: [],
})
export class ListUserComponent extends BaseComponent {
    protected users$!: Observable<UserFeature[]>;

    constructor(private userListFeature: ListUserFeatureService, private route: Router) {
        super();
    }

    override ngOnInit(): void {
        this.users$ = this.userListFeature.getAll();
    }

    protected deleteUser(userId: number) {
        this.userListFeature.delete(userId);
        this.userListFeature.getAll();
    }
}
