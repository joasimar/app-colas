const fs = require('fs')

class Ticket{
     constructor(numero, escritorio){
          this.numero= numero;
          this.escritorio= escritorio
     }
}
class TicketControl{
     constructor(){
          this.ultimo=0
          this.hoy= new Date().getDate();
          this.tickets=[]
          this.ultimos4=[]
          let data= require('../data/data.json')

          if(data.hoy=== this.hoy){
               this.ultimo= data.ultimo
               this.tickets= data.tickets
               this.ultimos4= data.ultimos4
          }else{
               this.reiniciarConteo()

          }
          console.log(data)


     }
     reiniciarConteo(){
          
          this.ultimo=0
          this.tickets=[]
          this.ultimos4=[]
          console.log('reinicio')
          this.grabararchivo()
     }
     siguiente(){
          this.ultimo += 1;
          let ticket = new Ticket(this.ultimo, null)
          this.tickets.push(ticket)

          this.grabararchivo()
          return "ticket "+this.ultimo
          
     }
     getUltimoTicket(){
          return "ticket "+this.ultimo
     }  
     getUltimos4(){
          return this.ultimos4
     }
     atenderTicket(escritorio){
          if( this.tickets.length===0){
               return "no ticket"
          }
          let numeroTicket = this.tickets[0].numero;
          this.tickets.shift()
          let atenderTicket= new Ticket(numeroTicket, escritorio)
          this.ultimos4.unshift( atenderTicket )
          if( this.ultimos4.length > 4){
               this.ultimos4.splice(-1,1)
          }
          console.log("ultimos4")

          console.log(this.ultimos4)
          this.grabararchivo()
          return atenderTicket

     }
     grabararchivo(){
          let jsonData={
               ultimo: this.ultimo,
               hoy: this.hoy,
               tickets: this.tickets,
               ultimos4: this.ultimos4
          }
          let jsonDataString = JSON.stringify(jsonData)
          fs.writeFileSync('./server/data/data.json', jsonDataString)
          //console.log('reinicio')
     }

}
module.exports= {
     TicketControl
}