import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormNewTaskComponent } from '../components/form-new-task/form-new-task.component';
import { TaskDetailComponent } from '../components/task-detail/task-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  tasks: Array<any> = [
    {
      id: 1239,
      title: "Entregar o trabalho",
      subtitle: "até o dia 22/05",
      description: "uma descrição completa...",
      image: "https://faculdadeimes.org.br/wp-content/uploads/2023/06/TCC.png"
    },
    {
      id: 742,
      title: "Realizar a prova",
      subtitle: "no dia 23/05",
      description: "uma descrição completa...",
      image: ""
    },
    {
      id: 892,
      title: "Combinar com os colegas",
      subtitle: "até o dia 25/05",
      description: "uma descrição completa...",
      image: ""
    }
  ]

  async editTask(task: any) {
    const modal = await this.modalController.create({
      component: FormNewTaskComponent,
      componentProps: {
        param: task
      }
    })
    await modal.present()
    const editTask = await modal.onDidDismiss();

    this.showToast('atualizada');

  }


  deleteTask(id: number) {

    let index = this.tasks.findIndex(t => t.id === id);
    this.tasks.splice(index, 1);
    this.showToast('excluída');
  }

  async addNewTask() {
    const modal = await this.modalController.create({
      component: FormNewTaskComponent
    })
    await modal.present()
    const newTask = await modal.onDidDismiss()
    if (newTask.data.title != '' &&
      newTask.data.subtitle != '') {
      this.tasks.push(newTask.data)
      this.showToast('adicionada');
    }

  }

  async showToast(acao: string) {
    const toast = await this.toastController.create({
      message: 'Tarefa ' + acao + ' com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success', // opções: "success", "danger", "warning", etc.
    });
    await toast.present();
  }

  async confirmDelete(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir esta tarefa?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteTask(id); // sua função de excluir
          }
        }
      ]
    });

    await alert.present();
  }

  async openDetail(task: any) {
    const modal = await this.modalController.create({
      component: TaskDetailComponent,
      componentProps: {
        task: task
      }
    })
    await modal.present()
  }
}
