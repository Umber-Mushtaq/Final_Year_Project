using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class AdminSignInDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string AdminEmail { get; set; }

        [Required]
        public string AdminPassword { get; set; }
    }
}
