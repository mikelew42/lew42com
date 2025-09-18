
try {
    const mod = await import("doesnt-exist.js");
} catch(error){
    console.log(error);
}