import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFormProps {
  type: 'sender' | 'recipient';
  title: string;
  addressLabel: string;
  values: {
    name: string;
    phone: string;
    address: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AddressForm({ type, title, addressLabel, values, onChange }: AddressFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="space-y-2">
        <Label>Name *</Label>
        <Input
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Phone *</Label>
        <Input
          type="tel"
          value={values.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>{addressLabel} *</Label>
        <Input
          value={values.address}
          onChange={(e) => onChange('address', e.target.value)}
          required
        />
      </div>
    </div>
  );
}