import {PrismaClient} from "@prisma/client";
import bodyParser, {BodyParser} from "body-parser";
import express from 'express';
import path from "path";

const prisma = new PrismaClient();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

type Contact = {
    name: any
    email: any
    phone: any
    msg: any
}

function validate(data: Contact) {
    if (data.name === '')
        return false;
    if (data.email === '')
        return false;
    if (data.msg === '')
        return false;
    return true;
}

app.post('/contact', async (req, res) => {
    // console.log(req.body);
    const {name, email, phone, msg} = req.body;
    if (!validate(req.body)) {
        res.status(400).send('Error en los datos')
        return;
    }
    try {

    await prisma.contact.create({
        data: {
            name,
            email,
            msg
        }
    });
    res.status(304).redirect('/?status=1');
    }catch (e) {
        console.log(e)
        res.status(304).redirect('/?status=0');
    }
});

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);