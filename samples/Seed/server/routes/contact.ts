import {Contact} from "../../common/contact";
import * as express from "express";

const router = express.Router();

router.get('/', function(req, res, next) {
  const contacts: Contact[] = [
    {id:1, name: "Ori"},
    {id:2, name: "Roni"},
  ];

  res.json(contacts);
});

export default router;