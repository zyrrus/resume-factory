import { type PropsWithChildren } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Page() {
  return (
    <main className="container flex flex-col gap-6 py-12">
      <h1 className="font-mono text-2xl font-semibold">Kitchen Sink</h1>
      <Typography />

      <h2 className="font-mono text-lg font-medium">Form Elements</h2>
      <Buttons />
      <Checkboxes />
      <Inputs />
    </main>
  );
}

const Row = ({ children }: PropsWithChildren) => (
  <div className="ml-8 flex flex-row gap-4">{children}</div>
);

const Col = ({ children }: PropsWithChildren) => (
  <div className="ml-8 flex flex-col gap-2">{children}</div>
);

const Typography = () => {
  return (
    <>
      <h2 className="font-mono text-lg font-medium">Typography</h2>
      <Col>
        <h1 className="font-mono text-2xl font-semibold">Heading 1</h1>
        <h2 className="font-mono text-lg font-medium">Heading 2</h2>
        <h3 className="font-mono font-medium">Heading 3</h3>
        <p>Paragraph</p>
      </Col>
      <Col>
        <p className="text-sm font-thin">Montserrat - 100</p>
        <p className="text-sm font-extralight">Montserrat - 200</p>
        <p className="text-sm font-light">Montserrat - 300</p>
        <p className="text-sm font-normal">Montserrat - 400</p>
        <p className="text-sm font-medium">Montserrat - 500</p>
        <p className="text-sm font-semibold">Montserrat - 600</p>
        <p className="text-sm font-bold">Montserrat - 700</p>
        <p className="text-sm font-extrabold">Montserrat - 800</p>
        <p className="text-sm font-black">Montserrat - 900</p>
      </Col>
      <Col>
        <p className="font-mono text-sm font-thin">Spline Sans Mono - 100</p>
        <p className="font-mono text-sm font-extralight">
          Spline Sans Mono - 200
        </p>
        <p className="font-mono text-sm font-light">Spline Sans Mono - 300</p>
        <p className="font-mono text-sm font-normal">Spline Sans Mono - 400</p>
        <p className="font-mono text-sm font-medium">Spline Sans Mono - 500</p>
        <p className="font-mono text-sm font-semibold">
          Spline Sans Mono - 600
        </p>
        <p className="font-mono text-sm font-bold">Spline Sans Mono - 700</p>
        <p className="font-mono text-sm font-extrabold">
          Spline Sans Mono - 800
        </p>
        <p className="font-mono text-sm font-black">Spline Sans Mono - 900</p>
      </Col>
    </>
  );
};

const Buttons = () => {
  return (
    <>
      <h3 className="font-mono font-medium">Buttons</h3>
      <Row>
        <Button variant="default">Primary</Button>
        <Button variant="neutral">Neutral</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </Row>
    </>
  );
};

const Checkboxes = () => {
  return (
    <>
      <h3 className="font-mono font-medium">Checkboxes</h3>
      <Col>
        <Row>
          <Checkbox id="checkbox-checked" checked />
          <Label htmlFor="checkbox-checked">Checked</Label>
        </Row>
        <Row>
          <Checkbox id="checkbox-unchecked" checked={false} />
          <Label htmlFor="checkbox-unchecked">Unchecked</Label>
        </Row>
        <Row>
          <Checkbox id="checkbox-checked-disabled" checked disabled />
          <Label htmlFor="checkbox-checked-disabled">Checked + Disabled</Label>
        </Row>
        <Row>
          <Checkbox id="checkbox-unchecked-disabled" checked={false} disabled />
          <Label htmlFor="checkbox-unchecked-disabled">
            Unchecked + Disabled
          </Label>
        </Row>
      </Col>
    </>
  );
};

const Inputs = () => {
  return (
    <>
      <h3 className="font-mono font-medium">Inputs</h3>
      <Row>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="input-email">Email</Label>
          <Input type="email" id="input-email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="input-disabled" disabled>
            Disabled
          </Label>
          <Input
            type="text"
            id="input-disabled"
            placeholder="Disabled"
            disabled
          />
        </div>
      </Row>
    </>
  );
};
