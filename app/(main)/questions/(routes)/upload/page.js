'use client';

import * as XLSX from 'xlsx';

import { File, FileText, Loader2, Upload } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import QuestionsTable from '@/app/(main)/questions/(routes)/upload/_components/questions-table';

import Link from 'next/link';
import { useState } from 'react';

import useQuestions from '@/hooks/useQuestions';
import { useToast } from '@/components/ui/use-toast';
import { v4 } from 'uuid';

const format = (data) => {
  try {
    let oldId = -1;
    let newId = -1;

    for (let i = 0; i < data.length; i++) {
      if (data[i].length == 0) return;
      for (let j = 0; j < data[i].length; j++) {
        if (j == 8) continue;

        if (j == 5 && typeof data[i][j] != 'number' && data[i][j] < 1 && data[i][j] > 4)
          throw Error(`[ROW : ${i + 1}][COLUMN : CORRECT ANSWER] : OUT OF RANGE || INVALID TYPE`);

        if (j == 9) {
          if (data[i][j].toLowerCase() == 'yes') {
            data[i][j] = true;

            if (typeof data[i][11] != 'number')
              throw Error(`[ROW : ${i + 1}][COLUMN : CASELET ID] : INVALID TYPE, SHOULD BE NUMBER`);

            if (data[i][11] != oldId) {
              newId = v4().slice(0, 8);
              oldId = data[i][11];
              data[i][11] = newId;
            } else data[i][11] = newId;

            if (typeof data[i][12] != 'number')
              throw Error(`[ROW : ${i + 1}][COLUMN : CASELET SEQUENCE] : INVALID TYPE, SHOULD BE NUMBER`);

            break;
          } else if (data[i][j].toLowerCase() == 'no') {
            data[i][j] = false;
            break;
          } else throw Error(`[ROW : ${i + 1}][COLUMN : IS CASELET] : INVALID [TYPE || FORMAT], SHOULD BE "yes"/"no"`);
        }

        if (!data[i][j]) throw Error(`[ROW : ${i + 1}][COLUMN : ${j + 1}] : EMPTY FIELD`);
      }
    }

    return data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const UploadPage = () => {
  const { creating, createQuestions } = useQuestions();
  const { toast } = useToast();
  const [data, setData] = useState(null);
  const [category, setCategory] = useState(null);

  const handleFile = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedArray = rawArray.filter((arr, i) => i != 0 && arr.length != 0);

      const formattedData = format(formattedArray);

      if (typeof formattedData === 'string') {
        toast({
          title: 'Invalid Format',
          description: formattedData,
          variant: 'destructive',
        });
        return;
      }

      setData(formattedData);

      document.getElementById('file').value = '';
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Upload</h1>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="md:w-3/4">
          <QuestionsTable data={data} />
        </div>
        <div className="md:w-1/4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link
                href={
                  'https://firebasestorage.googleapis.com/v0/b/letsnailthis-basic-funda.appspot.com/o/format.xlsx?alt=media&token=ee38ef62-d714-4195-b28a-35cf5e63ca8d'
                }
                target="_blank"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="sr-only lg:not-sr-only sm:whitespace-nowrap">Format</span>
              </Link>
            </Button>
            <Button disabled={creating} asChild size="sm" className="gap-1">
              <Label htmlFor="file">
                <File className="h-3.5 w-3.5" />
                <span className="not-sr-only sm:whitespace-nowrap">Select File</span>
              </Label>
            </Button>
            <Input
              className="hidden"
              id="file"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qa">Quantitative Ability (QA)</SelectItem>
                      <SelectItem value="varc">Verbal Ability & Reading Comprehension (VARC)</SelectItem>
                      <SelectItem value="dilr">Data Interpretation & Logical Reasoning (DILR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  disabled={!category || !data || creating}
                  size="sm"
                  className="gap-1"
                  onClick={() => createQuestions(data, category)}
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="not-sr-only sm:whitespace-nowrap">Please Wait...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      <span className="not-sr-only sm:whitespace-nowrap">Upload</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default UploadPage;
