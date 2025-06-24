import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-insertareditarusuario',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarusuario.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarusuario.css'
})
export class Insertareditarusuario implements OnInit{
  form:FormGroup = new FormGroup({})
  valorDefecto:boolean=true
  usuario: Usuario = new Usuario()
  id:number=0
  edicion: boolean = false
  listaRoles: Rol[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private uS:UsuarioService,
    private route:ActivatedRoute,
    private router: Router,
    private rS:RolService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
      this.form = this.formBuilder.group({
      codigo: [0],
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
      this.usuario.idUsuario = this.form.value.codigo,
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
          this.uS.list().subscribe(data=>{
            this.uS.setList(data)
          })
        })
      }
      else{
        this.uS.insert(this.usuario).subscribe(()=>{
            this.uS.list().subscribe(data=>{
              this.uS.setList(data)
            })
          })
      }
      this.router.navigate(['usuarios'])
    }
  }
  /*init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          username:new FormControl (data.username),
          correo: new FormControl (data.correo),
          password: new FormControl(data.password),
          ciclo: new FormControl (data.ciclo),
          puntos:new FormControl (data.puntos),
          carrera: new FormControl (data.carrera),
          centro_de_estudios: new FormControl (data.centro_de_estudios),
          rol: new FormControl (data.rol.idRol),
          estado:new FormControl(data.estado)
        })
      })
    }
  }*/
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data=>{
        this.form.patchValue({ 
          codigo: data.idUsuario,
          username: data.username,
          correo: data.correo,
          password: data.password,
          ciclo: data.ciclo,
          puntos: data.puntos,
          carrera: data.carrera,
          centro_de_estudios: data.centro_de_estudios,
          rol: data.rol.idRol,
          estado: data.estado
        })
      })
    }
  }
  
}
