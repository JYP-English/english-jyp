using EnglishTutorPlatform.Core.DTOs.Inquiry;
using EnglishTutorPlatform.Core.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendInquiryNotificationAsync(InquiryDto inquiry)
    {
        var settings = _config.GetSection("EmailSettings");
        var gmailAddress = settings["GmailAddress"] ?? "";
        var appPassword = settings["AppPassword"] ?? "";

        if (string.IsNullOrEmpty(appPassword))
        {
            _logger.LogWarning("EmailSettings:AppPassword가 설정되지 않아 이메일 발송을 건너뜁니다.");
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("카르마 영어학원", gmailAddress));
            message.To.Add(new MailboxAddress("", gmailAddress));
            message.Subject = $"[카르마 학원] 새 수강문의 - {inquiry.Name}";

            var grade = inquiry.Grade.HasValue ? $"{inquiry.Grade}학년" : "-";
            var school = inquiry.School ?? "-";
            var createdAt = inquiry.CreatedAt.ToLocalTime().ToString("yyyy-MM-dd HH:mm");

            message.Body = new TextPart("plain")
            {
                Text = $"""
                새로운 수강 문의가 접수되었습니다.

                ─────────────────────────
                이름    : {inquiry.Name}
                연락처  : {inquiry.Phone}
                학교    : {school}
                학년    : {grade}
                ─────────────────────────
                문의 내용:
                {inquiry.Message}
                ─────────────────────────
                접수 시간: {createdAt}

                관리자 페이지 → 문의 관리에서 확인하세요.
                """
            };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(gmailAddress, appPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("문의 알림 이메일 발송 완료: {Name}", inquiry.Name);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "이메일 발송 실패");
        }
    }
}
