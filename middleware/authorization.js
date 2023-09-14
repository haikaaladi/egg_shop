//  fungsi authorization
exports.cekUser = (request, response, next)=>{
    // fungsi ini digunakan utk mengecek data user ygg tersimpan di session
    // jika datanya tersimpan di session maka boleh mengakses fitur yg diinginkan
    // jika datany atidak tersimpan maka akan dikembalikan ke hlm login
    if(request.session.dataUser === undefined){
        return response.redirect(`\auth`)
    }else{
        // lanjut
        next()
    }
}
