const { json } = require('express');
const express = require('express');
const app = express();
const port =  process.env.PORT ||3001;
const contacts = [
    {
        firstName: "Alejandro",
        surname: "Becerra",
        phone: 320998820,
        github: "becerra2906",
        work: "Instaleap",
        role: "Product Manager",
        id: 1

    }
];
const idGenerator = contacts.length + 1;



app.use(json());

app.get('/api',(req,res)=>{
    res.send("<p>This api allows you to access and add contacts to a phone directory</p>");
})

app.get('/info',(req,res)=>{
    let date = new   Date
    res.send(`This phonebook has info for ${contacts.length} contacts </br>${date}`);
})


app.post('/api/contacts',(req,res)=>{
    const contactInfo = req.body
    contactInfo.id = idGenerator;
    contacts.push(contactInfo);
    if (contactInfo){
        console.log(contacts);
         
        return res.send({
            data: contacts,
            message: `Contact created successfully`
        });
    }
    else {
        res.status(400);
    }

});

app.get('/api/contacts',(req,res)=>{
    if (contacts.length > 0){
        res.send(contacts);
    }
    else{
        res.status(204);
        res.send('No contacts available')
    }
})

app.get('/api/contacts/:id',(req,res)=>{
    const id =  (req.params.id);
    const contact = (contacts.find(contactSearched => contactSearched.id === id));
    if (contact){
        res.send(contact);
    }
    else{
        res.status(404);
        res.send('No contact available with that ID');
        res.console.log('No contact available with that ID');
    }
})

app.delete('/api/contacts/:id',(req,res)=>{
    const id = Number(req.params.id);
    const remainingContacts = (contacts.filter(contactDeleted => contactDeleted.id !== id));
    
    if (remainingContacts){
        res.send(remainingContacts);
    }
    else{
        res.status(204);
        res.send('No contact available with that ID');
        res.console.log('No contact available with that ID');
    }
})

app.listen(port,(req,res) => {
    console.log (`Server is running on ${port}`)
} )