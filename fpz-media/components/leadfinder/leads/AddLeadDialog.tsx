"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RUHRGEBIET_CITIES, BUSINESS_CATEGORIES } from "@/lib/constants";
import { Plus } from "lucide-react";
import { createLead } from "@/app/leads/actions";
import { toast } from "sonner";

interface FormErrors {
  name?: string;
  address?: string;
  city?: string;
  category?: string;
  website?: string;
  email?: string;
}

export function AddLeadDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [notes, setNotes] = useState("");

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Name ist erforderlich";
    if (!address.trim()) newErrors.address = "Adresse ist erforderlich";
    if (!city) newErrors.city = "Stadt ist erforderlich";
    if (!category) newErrors.category = "Branche ist erforderlich";
    if (website && !website.startsWith("http://") && !website.startsWith("https://")) {
      newErrors.website = "Website muss mit http:// oder https:// beginnen";
    }
    if (email && !email.includes("@")) {
      newErrors.email = "Ungueltige Email-Adresse";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function resetForm() {
    setName("");
    setAddress("");
    setCity("");
    setZip("");
    setPhone("");
    setEmail("");
    setWebsite("");
    setCategory("");
    setGoogleMapsUrl("");
    setOpeningHours("");
    setNotes("");
    setErrors({});
  }

  function handleSubmit() {
    if (!validate()) return;

    startTransition(async () => {
      try {
        const lead = await createLead({
          name: name.trim(),
          address: address.trim(),
          city,
          zip: zip.trim() || undefined,
          phone: phone.trim() || undefined,
          email: email.trim() || undefined,
          website: website.trim() || undefined,
          category,
          googleMapsUrl: googleMapsUrl.trim() || undefined,
          openingHours: openingHours.trim() || undefined,
          notes: notes.trim() || undefined,
        });
        toast.success("Lead erstellt");
        setOpen(false);
        resetForm();
        router.push(`/secret/leads/${lead.id}`);
      } catch {
        toast.error("Fehler beim Erstellen");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Lead hinzufuegen
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lead manuell hinzufuegen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Firmenname *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-900 border-zinc-800"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Adresse *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-zinc-900 border-zinc-800"
            />
            {errors.address && (
              <p className="text-xs text-red-400 mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Stadt *" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[200px]">
                {RUHRGEBIET_CITIES.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1">{errors.city}</p>
            )}
          </div>
          <Input
            placeholder="PLZ"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />
          <Input
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />
          <div>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900 border-zinc-800"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Website (https://...)"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="bg-zinc-900 border-zinc-800"
            />
            {errors.website && (
              <p className="text-xs text-red-400 mt-1">{errors.website}</p>
            )}
          </div>
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Branche *" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[200px]">
                {BUSINESS_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-400 mt-1">{errors.category}</p>
            )}
          </div>
          <Input
            placeholder="Google Maps URL"
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />
          <Input
            placeholder="Oeffnungszeiten"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />
          <Textarea
            placeholder="Notizen"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-zinc-900 border-zinc-800 min-h-[80px]"
          />
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Wird erstellt..." : "Lead erstellen"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
