using System.ComponentModel;
using System.Drawing;
using System.Linq.Expressions;
using System.Reflection;
using System.Security.Cryptography.Xml;
using System.Transactions;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRouting();

app.UseDefaultFiles();

app.UseStaticFiles();

app.Run();
