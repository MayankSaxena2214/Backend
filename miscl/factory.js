function personmake(name,age){
    const person={
        name:name,
        age:age,
        talk(){
            console.log("person is speaking");
        }
    }
    return person;
}