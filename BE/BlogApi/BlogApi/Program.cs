using BlogApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using BlogApi.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình DbContext với chuỗi kết nối từ appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:3000")  // Địa chỉ frontend của bạn
               .AllowAnyMethod()                    // Cho phép tất cả các phương thức HTTP
               .AllowAnyHeader()                    // Cho phép tất cả các header
               .AllowCredentials();                 // Cho phép cookies (nếu bạn sử dụng cookie authentication)
    });
});

// Cấu hình Cookie Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.LogoutPath = "/logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.SlidingExpiration = true;
    });

// Cấu hình Swagger với hỗ trợ Cookie Authentication
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Blog API",
        Version = "v1",
        Description = "API for managing blogs with Cookie Authentication"
    });

    // Cấu hình cho Authorization với Cookie
    options.AddSecurityDefinition("Cookie", new OpenApiSecurityScheme
    {
        Description = "Enter your credentials to login",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Cookie"
                }
            },
            new string[] {}
        }
    });
});

// Thêm các dịch vụ khác
builder.Services.AddControllers();

var app = builder.Build();

// Cấu hình pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Blog API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");  // Đảm bảo CORS được cấu hình trước Authentication
app.UseAuthentication();  // Thêm xác thực cookie
app.UseAuthorization();   // Cấp quyền truy cập cho API

app.MapControllers();

app.Run();