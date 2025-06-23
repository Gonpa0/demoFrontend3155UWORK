import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-insertareditarusuario',
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './insertareditarusuario.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarusuario.css'
})
export class Insertareditarusuario implements OnInit{
  form:FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()
  id:number=0
  edicion: boolean = false
  listaRoles: Rol[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService,
    private router: Router,
    private rS:RolService
  ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      idUsuario: [0],
      username: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      ciclo: ['', Validators.required],
      puntos: ['', Validators.required],
      carrera: ['', Validators.required],
      centro_de_estudios: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required]
    })
    this.rS.list().subscribe(data=>{
      this.listaRoles = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.idUsuario,
      this.usuario.username = this.form.value.username,
      this.usuario.correo = this.form.value.correo,
      this.usuario.password = this.form.value.password,
      this.usuario.ciclo = this.form.value.ciclo,
      this.usuario.puntos = this.form.value.puntos,
      this.usuario.carrera = this.form.value.carrera,
      this.usuario.centro_de_estudios = this.form.value.centro_de_estudios,
      this.usuario.rol.idRol = this.form.value.rol,
      this.usuario.estado = this.form.value.estado
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          })
        })
      }
      else{
        this.uS.insert(this.usuario).subscribe(()=>{
            this.rS.list().subscribe(data=>{
              this.rS.setList(data)
            })
          })
      }
      this.router.navigate(['usuarios'])
    }
  }
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          idUsuario:data.idUsuario,
          username:data.username,
          correo:data.correo,
          password:data.password,
          ciclo:data.ciclo,
          puntos:data.puntos,
          carrera:data.carrera,
          centro_de_estudios:data.centro_de_estudios,
          rol:data.rol.idRol,
          estado:data.estado
        })
      })
    }
  }
  
}
